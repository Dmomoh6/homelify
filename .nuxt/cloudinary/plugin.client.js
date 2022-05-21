import { ClientApi } from '~cloudinary/client'

const configuration = {
  "privateCdn": false,
  "cloudName": "dmomoh6",
  "secure": true
}

export default function (context, inject) {
  const cloudinary = new ClientApi(configuration)

  context.$cloudinary = cloudinary
  inject('cloudinary', cloudinary)
}