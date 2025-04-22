## 通过Docker安装Clash实现全局代理上网

为了简化`Clash.Meta`的部署过程，本文档将指导如何使用`Docker`快速部署这两个应用。
Docker 可以在任何支持它运行的环境中启动这些应用，从而避免复杂的环境配置。

### 准备工作

### 使用Docker Compose部署

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

## 访问yacd

当所有容器均成功启动后，可通过浏览器访问 http://localhost（若为本地部署）以打开`yacd`的管理界面。在此界面中，可进行
`Clash.Meta`实例的配置与管理。