import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: 'amplifyDndSceneStorage',
  access: (allow) => ({
    'scenes/*': [
      allow.authenticated.to(['read', 'write']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]
  })
})