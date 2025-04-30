---
title: KMS 本地激活方案
description: 使用Docker Compose部署KMS激活服务器。
---

# KMS 本地激活方案

为了简化`KMS`的部署过程，本文档将指导如何使用`Docker`快速部署。
Docker 可以在任何支持它运行的环境中启动这些应用，从而避免复杂的环境配置。

## 环境要求

在开始部署服务前，确保系统满足以下前提条件。

- 操作系统: Debian12
- 软件: Docker + Docker Compose

## 镜像

- mikolatero/vlmcsd: KMS镜像文件

## 目录结构

```shell
/docker
|-- kms
|   |-- data
|-- docker-compose.yaml
```

## docker-compose.yaml 示例

```yaml
services:
  kms:
    image: mikolatero/vlmcsd:latest
    container_name: kms-server
    ports:
      - "1688:1688"
    volumes:
      - /docker/kms/data:/data
    restart: always    
```