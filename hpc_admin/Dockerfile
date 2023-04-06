# FROM alpine:3.13
# # 安装依赖包，如需其他依赖包，请到alpine依赖包管理(https://pkgs.alpinelinux.org/packages?name=php8*imagick*&branch=v3.13)查找。
# # 选用国内镜像源以提高下载速度
# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tencent.com/g' /etc/apk/repositories \
#     && apk add --update --no-cache npm wget curl bash

# FROM node:18.14.0

# ENV NODE_VERSION=18.14.0
# ENV NVM_DIR /tmp/nvm
# WORKDIR $NVM_DIR
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash \
#   && . $NVM_DIR/nvm.sh \
#   && nvm install $NODE_VERSION \
#   && nvm alias default $NODE_VERSION \
#   && nvm use $NODE_VERSION
# ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
# ENV PATH $NVM_DIR/v$NODE_VERSION/bin:$PATH
# RUN node --version
# RUN npm --version

# # # 指定工作目录
# WORKDIR /app

# # 拷贝包管理文件
# # COPY package*.json /app/

# # npm 源，选用国内镜像源以提高下载速度
# RUN npm config set registry https://registry.npm.taobao.org/ 
# # RUN npm config set registry https://registry.npm.taobao.org/ && npm install -g npm
# # RUN npm config set registry https://registry.npm.taobao.org/  https://mirrors.cloud.tencent.com/npm/
# RUN npm install -g yarn -f
# RUN yarn config set registry https://registry.npmmirror.com
# RUN yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass
# # 将当前目录（dockerfile所在目录）下所有文件都拷贝到工作目录下
# COPY . /app

# RUN yarn

# RUN yarn build

# # RUN npm i

# # RUN npm run build
# # 执行启动命令
# # CMD ["node", "index.js"]

FROM nginx 
VOLUME /tmp
ENV LANG en_US.UTF-8
RUN echo "server {  \
                      listen       880; \
                      location   /hpc/ { \
                      proxy_pass              http://172.16.1.21:3000/; \
                      proxy_redirect          off; \
                      proxy_set_header        Host 172.16.1.21; \
                      proxy_set_header        X-Real-IP \$remote_addr; \
                      proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for; \
                  } \
                  #解决Router(mode: 'history')模式下，刷新路由地址不能找到页面的问题 \
                  location / { \
                     root   /var/www/html/; \
                      index  index.html index.htm; \
                      if (!-e \$request_filename) { \
                          rewrite ^(.*)\$ /index.html?s=\$1 last; \
                          break; \
                      } \
                  } \
                  access_log  /var/log/nginx/access.log ; \
              } " > /etc/nginx/conf.d/default.conf \
    &&  mkdir  -p  /var/www \
    &&  mkdir -p /var/www/html

ADD dist/ /var/www/html/
EXPOSE 880
EXPOSE 443
