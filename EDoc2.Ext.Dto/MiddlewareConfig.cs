using System;
using System.Collections.Generic;
using System.Text;

namespace EDoc2.Ext.Dto
{
    public class MiddlewareConfig
    {
        /// <summary>
        ///数据库类型。1:sqlserver,2:oracle,3:mysql,4:达梦,5:postgresql,6:人大金仓
        /// </summary>
        public int DatabaseType { get; set; }

        /// <summary>
        /// 数据库地址
        /// </summary>
        public string DatabaseServerName { get; set; }

        /// <summary>
        /// 数据库账号
        /// </summary>
        public string DatabaseUserName { get; set; }

        /// <summary>
        /// 数据库密码
        /// </summary>
        public string DatabasePassword { get; set; }

        /// <summary>
        /// 数据库端口
        /// </summary>
        public int DatabaseServerPort { get; set; }

        /// <summary>
        /// 数据库名字
        /// </summary>
        public string DatabaseName { get; set; }

        /// <summary>
        /// MQ供应商0:RabbitMQ，1:Aliyun.AMQP，511及以后版本适用
        /// </summary>
        public string MQSupplier { get; set; }

        /// <summary>
        /// MQ的连接地址，没端口不加，集群下有多个主机用“,”分隔例:192.168.251.142:5672,192.168.251.155:5672511及以后版本适用
        /// </summary>
        public string MQEndPoint { get; set; }

        /// <summary>
        /// MQ的访问用户名
        /// </summary>
        public string MQUserName { get; set; }

        /// <summary>
        /// MQ的访问密码
        /// </summary>
        public string MQPwd { get; set; }

        /// <summary>
        /// MQ的虚拟访问主机名
        /// </summary>
        public string MQVHostName { get; set; }

        /// <summary>
        /// Redis实例ID。511及以后版本适用
        /// </summary>
        public string RedisHostID { get; set; }

        /// <summary>
        /// Redis实例名称
        /// </summary>
        public string RedisHostName { get; set; }

        /// <summary>
        /// Redis认证密码。
        /// </summary>
        public string RedisPassword { get; set; }

        /// <summary>
        /// Redis端口。
        /// </summary>
        public int RedisPort { get; set; }

        /// <summary>
        /// redis主从模式 host1。
        /// </summary>
        public string RedisHostID1 { get; set; }

        /// <summary>
        /// redis主从模式 host2。
        /// </summary>
        public string RedisHostID2 { get; set; }

        /// <summary>
        /// redis主从模式 host3。
        /// </summary>
        public string RedisHostID3 { get; set; }

        /// <summary>
        /// redis主从模式 host1 port。
        /// </summary>
        public int RedisPort1 { get; set; }

        /// <summary>
        /// redis主从模式 host2 port。
        /// </summary>
        public int RedisPort2 { get; set; }


        /// <summary>
        /// redis主从模式 host3 port。
        /// </summary>
        public int RedisPort3 { get; set; }

        /// <summary>
        /// redismastername。
        /// </summary>
        public string RedisMasterName { get; set; }

        /// <summary>
        /// es地址。es集群环境配置用,隔开。如：http://es:9200,http://es2:9200,http://es3:9200510及以后版本适用
        /// </summary>
        public string ESURL { get; set; }

        /// <summary>
        /// 连接池数量。单位：个
        /// </summary>
        public int RedisPoolSize { get; set; }

        /// <summary>
        /// 维持连接数最小值，避免全部释放。单位：个
        /// </summary>
        public int RedisPoolMinSize { get; set; }

        /// <summary>
        /// 间隔回收连接池时间。 单位：分钟
        /// </summary>
        public int PoolReleaseInterval { get; set; }

        /// <summary>
        /// 区分http和https。https环境请将值改为https
        /// </summary>
        public string HTTP_PROTOCOL_TYPE { get; set; }

        /// <summary>
        /// 产品类型。值为edoc2和InDrive
        /// </summary>
        public string PRODUCTION { get; set; }

        /// <summary>
        /// 主区域传输地址,512及高于512版本
        /// </summary>

        public string Region_TSAP { get; set; }

        /// <summary>
        /// 存储平台。0:本地存储,2:ceph存储,3:swift存储,4:OSS存储,5:KS3存储(510及以后版本支持)
        /// </summary>
        public int STORAGEPLATFORM { get; set; }

        /// <summary>
        /// 除本地存储以外,所有对象存储的访问地址,512及以后版本
        /// </summary>
        public string S3_Url { get; set; }

        /// <summary>
        /// 除本地存储以外,所有对象存储的访问地址511及以下版发,512请使用S3_Url
        /// </summary>
        public string Ceph_Url { get; set; }

        /// <summary>
        /// ceph存储、OSS存储、KS3存储的访问id,512及以后版本
        /// </summary>
        public string S3_AccessKey { get; set; }

        /// <summary>
        /// 对象存储的访问密钥,512及以后版本
        /// </summary>
        public string S3_SecretKey { get; set; }

        /// <summary>
        /// S3对象存储桶，swift存储的容器名,512及以后版本
        /// </summary>
        public string S3_Bucket { get; set; }

        /// <summary>
        /// S3对象签名版本，2或4，默认4，512及以后版本
        /// </summary>
        public string S3_SignatureVersion { get; set; }

        /// <summary>
        /// ceph存储获取空间大小的url
        /// </summary>
        public string Ceph_HealthUrl { get; set; }
    }
}
