# 使用 node 6.10.3 的精简版作为基础镜像
FROM node:6.10.3-slim

# 安装nginx
RUN apt-get update \
    && apt-get install -y nginx

# 指定工作目录
WORKDIR /app

# 将当前目录下的所有文件拷贝到工作目录下
COPY . /app/

# 声明运行时容器提供服务端口
EXPOSE 80

# 1.安装依赖
# 2.运行npm run build
# 3.将dist目录到所有文件拷贝到nginx的目录下
# 4.删除工作目录的文件，尤其时node_modules以减少镜像体积
# 由于镜像构建的每一步都会产生新层
# 为了减少镜像体积，尽可能将一些同类操作，集成到一个步骤中，如下
RUN  npm install


# 以前台方式启动nginx
CMD ["nginx","-g","daemon off;"]
