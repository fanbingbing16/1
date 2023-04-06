FROM alpine:3.13

# 安装依赖包，如需其他依赖包，请到alpine依赖包管理(https://pkgs.alpinelinux.org/packages?name=php8*imagick*&branch=v3.13)查找。
# 选用国内镜像源以提高下载速度
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tencent.com/g' /etc/apk/repositories \
    && apk add --update --no-cache python3 nodejs npm

# # 指定工作目录
WORKDIR /app

# 拷贝包管理文件
COPY package*.json /app/

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://registry.npm.taobao.org/ && npm install -g npm
# RUN npm config set registry https://registry.npm.taobao.org/
RUN npm install -g yarn
# RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn config set registry https://registry.npmmirror.com
RUN yarn config set canvas_binary_host_mirror https://npmmirror.com/mirrors/canvas
RUN yarn global add @nestjs/cli
RUN yarn

# 将当前目录（dockerfile所在目录）下所有文件都拷贝到工作目录下
COPY . /app

RUN yarn build

# 执行启动命令
CMD ["node", "dist/main"]