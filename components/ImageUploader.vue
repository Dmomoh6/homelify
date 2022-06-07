<template>
  <div class="imageUpload">
    <input
      type="file"
      id="file-upload"
      accept=".jpg,.jpeg,image/jpeg"
      @change="uploadFile"
      required
    />
  </div>
</template>

<script>
import { resolve } from "path";
import { unWrap } from "~/utils/fetchUtils";
export default {
  methods: {
    async uploadFile(e) {
      const file = e.target.files[0];
      if (!file) return;
      const filename = file.name.split(".").slice(0, -1).join(".") + Date.now();
      const options = {
        timestamp: Date.now(),
        public_id: filename,
      };
      const response = await unWrap(
        await fetch("/api/cloudinary/signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(options),
        })
      );
      const signature = response.json.signature;
      const readData = (fileObj) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(fileObj);
        });

      const data = await readData(file);
      const asset = await this.$cloudinary.upload(data, {
        ...options,
        apiKey: this.$config.cloudinary.apiKey,
        signature,
      });

      this.$emit("file-uploaded", asset.secure_url);
    },
  },
};
</script>
