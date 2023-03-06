## Minio-Vite-JS
Minio的官方客户端使用时必须依赖node.js, 无法在vite项目中使用, 此项目把minio的使用打包为纯js,可以在浏览器中直接调用minio的客户端。
minio-js提供的接口只有initMinio和putObject，对于其他使用需求不够方便，比如下载，删除，获取文件列表，获取文件信息等需求。
在本项目中提供最简单的两个接口：createClient和BufferFrom,具体使用方法见下方

## 源码地址
https://gitee.com/zheyiw/minio-js-m

## npm包地址
https://www.npmjs.com/package/minio-vite-js

## 安装
npm i minio-vite-js

## 在vue3(vite)中使用
~~~
<template>
  <div id="nav">
    <p>vite中import使用miniojs上传文件</p>
    <input ref="input" type="file" @change="putFiles" />
  </div>
</template>
<script setup>
import { Bufferfrom, createClient } from 'minio-vite-js'

// 全局s3client对象
const s3Client = null

/**
 * 创建并更新全局s3client:
 * 具体的endPoint ,port ,acesskey ,secretKey使用你自己项目中的值
 * createClient接口的调用方法与minio中的new Minio.Client使用方法相同
 */
function setS3Client() {
  this.s3Client = createClient({
    endPoint: 'play.min.io',
    port: 9000,
    accessKey: 'Q3AM3UQ867SPQQA43P2F',
    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
  })
}

/**
 * 上传文件
 * 有了s3Client对象之后，调用其他接口就完全和minio官网的使用方式相同了
 * 注意这里使用了Bufferfrom接口，因为直接在vite项目中使用Buffer.from()会报错，所以我把这个功能也单独封装了一下
 */
function putFiles(event) {
  var f = event.target.files[0]
  let reader = new FileReader()
  reader.readAsArrayBuffer(f)
  reader.onload = function (e) {
    let res = e.target.result //ArrayBuffer
    let buf = Bufferfrom(res) //Buffer
    this.s3Client.putObject('act', f.name, buf, function (err, data) {
      if (err) console.log(err)
      else {
        console.log('上传完成', data)
      }
    })
  }
}
</script>
~~~

## 使用说明
- 在控制端可以设置bucket为public, 就可以拼接出资源的永久访问连接: http://ip:port/bucketname/filename
- 文件名一定要重命名好, 上传了相同的文件名会覆盖之前的文件
