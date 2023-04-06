import * as request from "request";
export async function get(url: string) {
  return new Promise<any>((reslove, reject) => {
    request.get(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        reslove(body);
      } else {
        reject(new Error(JSON.stringify(error)));
      }
    });
  });
}

export async function post(url: string, requestData: any) {
  return new Promise<any>((reslove, reject) => {
    request.post(url, requestData, (error, response, body) => {
      // console.log(url, requestData, error, response, body)
      //非业务层的错误判断
      if (!error && response.statusCode == 200) {
        console.log("post 200", body);
        reslove(body); // 请求成功的处理逻辑
      } else {
        console.log("post error", error);
        reject(new Error(JSON.stringify(error)));
      }
    });
  });
}
