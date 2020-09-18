  module.exports = {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: process.env.AMAZON_ID,
      secretAccessKey: process.env.AMAZON_SECRET,
      region: "eu-west-3",
      params: {
        Bucket: "flashimages"
      }
    },
  };