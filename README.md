# node.js-anywhere

my NodeJs Static Web Server

## install

```

npm i -g anywhere
```

## how to use?

anywhere # 把当前文件夹作为静态资源服务器根目录

anywhere -p 8080 # 设置端口号为 8080

anywhere -h localhost # 设置 host 为 localhost

anywhere -d /usr # 设置根目录为 /usr

```

anywhere  # 把当前文件夹作为静态资源服务器根目录

anywhere -p 8080 # 把端口号设置为任意（eg：8080）

anywhere -h localhost # 把主机设置为任意（eg：localhost）

anywhere -d /user # 把根目录设置为任意（eg：/usr）

```

## tips

```
range -- 设置header头来设置想要读取文件的范围 利用curl去设置
compress -- 利用node的zlib中的gzip或者deflate方法去压缩

```

## tools

```
supervisor --  monitor and control a number of processes on UNIX-like operating systems
              (自动监听文件修改并重启server)

curl -- 方便进行http设置，参数传递等

chalk -- highlights

yargs -- Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface


pre-commit -- tests before commit
```
