export const Minio = require("minio");

let MinioConfig = null;

export function createClient(config) {
  if (!config) {
    throw new Error("Minio的配置不能为空");
  }
  console.log("initMinio");
  MinioConfig = config;
  var minioClient = new Minio.Client(MinioConfig);
  return minioClient
}

export function Bufferfrom(file) {
  return Buffer.from(file)
}

//封装的上传到minio
function putObject(bucketName, file, fileName, callback) {
  if (!MinioConfig) {
    throw new Error("请先初始化Minio");
  }
  console.log("MinioJs.putObject:" + bucketName + "," + fileName);
  let buf = Buffer.from(file); //Buffer
  var Minio = require("minio");
  var minioClient = new Minio.Client(MinioConfig);
  minioClient.putObject(
    bucketName,
    fileName,
    buf,
    callback
  );
}

//封装的下载到minio
function getObject(bucketName, fileName, callback) {
  if (!MinioConfig) {
    throw new Error("请先初始化Minio");
  }
  var Minio = require("minio");
  var minioClient = new Minio.Client(MinioConfig);
  console.log("MinioJs.getObject:" + bucketName + "," + fileName);
  minioClient.getObject(
    bucketName,
    fileName,
    callback
  );
}

function listObjects(bucketName, prefix, recursive, callback) {
  if (!MinioConfig) {
    throw new Error("请先初始化Minio");
  }
  var Minio = require("minio");
  var minioClient = new Minio.Client(MinioConfig);
  console.log("MinioJs.listObjects:" + bucketName + "," + prefix);
  minioClient.listObjects(
    bucketName,
    prefix,
    recursive,
    callback
  );
}

function removeObject(bucketName, fileName, callback) {
  if (!MinioConfig) {
    throw new Error("请先初始化Minio");
  }
  var Minio = require("minio");
  var minioClient = new Minio.Client(MinioConfig);
  console.log("MinioJs.removeObjects:" + bucketName + "," + fileName);
  minioClient.listObjects(
    bucketName,
    fileName,
    callback
  );
}

