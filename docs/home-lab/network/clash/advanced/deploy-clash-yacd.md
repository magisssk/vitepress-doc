---
title: Clash 全局代理上网方案
description: 使用Docker Compose和Clash.Meta实现Clash统一全局代理。
---

# Clash 全局代理上网方案

为了简化`Clash.Meta`的部署过程，本文档将指导如何使用`Docker`快速部署这两个应用。
Docker 可以在任何支持它运行的环境中启动这些应用，从而避免复杂的环境配置。

## 环境要求

在开始部署服务前，确保系统满足以下前提条件。

- 操作系统: Debian12
- 软件: Docker + Docker Compose

## 镜像

- MetaCubeX/Clash.Meta: Clash.Meta核心镜像。
- haishanh/yacd: Yacd可视化管理面板。

## 目录结构

```shell
/docker
|-- clash
|   |-- config
|      |-- cache.db
|      |-- config.yaml
|      |-- geoip.metadb
|      |-- proxies
|      |-- rules
|-- docker-compose.yaml
```

其中, `geoip.metadb`为全球IP库，可以实现各个国家的IP信息解析和地理定位，没有这个文件clash是无法运行的，需要提前下载好放入config文件挂载的位置。

## docker-compose.yaml 示例

```yaml
services:
  clash:
    image: metacubex/mihomo
    container_name: clash-meta
    restart: unless-stopped
    ports:
      - 7890:7890
      - 7891:7891
      - 9090:9090
    volumes:
      - ./clash/config:/root/.config/mihomo
      - /dev/net/tun:/dev/net/tun
    environment:
      - TZ=Asia/Shanghai
    networks:
      - clash-net

  yacd:
    image: ghcr.io/haishanh/yacd:master
    container_name: clash-dashboard
    restart: unless-stopped
    ports:
      - 8080:80
    environment:
      - TZ=Asia/Shanghai
    networks:
      - clash-net
      
networks:
  clash-net:
    driver: bridge
    
```

## 访问方式

Yacd 面板地址：`http://<nas ip>:8080`

Clash 控制接口：`http://<nas ip>:9090`