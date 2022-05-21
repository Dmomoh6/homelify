export default function ({ $config, context }, inject) {
  let isLoaded = false;
  let waiting = [];

  window.initGoogleMaps = initGoogleMaps;
  addScript();
  function addScript() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${$config.googleMaps.key}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    document.head.appendChild(script);
  }

  inject("maps", {
    showMap,
    makeAutoComplete,
  });

  function initGoogleMaps() {
    isLoaded = true;
    waiting.forEach((item) => {
      if (typeof item.fn === "function") {
        item.fn(...item.arguments);
      }
    });
    waiting = [];
  }

  function makeAutoComplete(input, types = ["(cities)"]) {
    if (!isLoaded) {
      waiting.push({ fn: makeAutoComplete, arguments });
      return;
    }
    const autoComplete = new window.google.maps.places.Autocomplete(input, {
      types,
    });
    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      input.dispatchEvent(new CustomEvent("changed", { detail: place }));
    });
  }

  function showMap(canvas, lat, lng, markers) {
    if (!isLoaded) {
      waiting.push({ fn: showMap, arguments });
      return;
    }
    const mapOptions = {
      zoom: 16,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi.business",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
      ],
    };

    const map = new window.google.maps.Map(canvas, mapOptions);
    if (!markers) {
      const position = new window.google.maps.LatLng(lat, lng);
      const marker = new window.google.maps.Marker({
        position,
        clickable: false,
        icon: "/images/marker-blue.svg",
      });
      marker.setMap(map);
      return;
    } else if (markers === "none") {
      const position = new window.google.maps.LatLng(lat, lng);
      const marker = new window.google.maps.Marker({
        position,
        clickable: false,
        icon: "https://maps.gstatic.com/mapfiles/transparent.png",
      });
      marker.setMap(map);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((home) => {
      const position = new window.google.maps.LatLng(home.lat, home.lng);
      const marker = new window.google.maps.Marker({
        position,
        label: {
          text: `$${home.pricePerNight}`,
          className: `marker home-${home.id} galano`,
        },
        clickable: false,
        icon: "https://maps.gstatic.com/mapfiles/transparent.png",
      });
      marker.setMap(map);
      bounds.extend(position);
    });

    map.fitBounds(bounds);
  }
}
