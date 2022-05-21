export { default as FeaturedListings } from '../../components/FeaturedListings.vue'
export { default as Foot } from '../../components/Foot.vue'
export { default as HomeCard } from '../../components/HomeCard.vue'
export { default as HomeRow } from '../../components/HomeRow.vue'
export { default as ImageUploader } from '../../components/ImageUploader.vue'
export { default as MyHomes } from '../../components/MyHomes.vue'
export { default as PremiumListings } from '../../components/PremiumListings.vue'
export { default as PropertyDetails } from '../../components/PropertyDetails.vue'
export { default as PropertyGallery } from '../../components/PropertyGallery.vue'
export { default as PropertyHeader } from '../../components/PropertyHeader.vue'
export { default as PropertyMap } from '../../components/PropertyMap.vue'
export { default as PropertyReviews } from '../../components/PropertyReviews.vue'
export { default as SearchBar } from '../../components/SearchBar.vue'
export { default as ShortText } from '../../components/ShortText.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
