/**
 * @description 处理请求返回值的数据，这里是请求成功的时候的返回值
 * @param res
 */
function getSuccessResData(res: any): {
  isSuccess: boolean;
  msg: string;
  data: any;
}  {
  return {
    isSuccess: true,
    data: res.data ? res.data : {},
    msg: res.msg ? res.msg : ''
  }
}

function getFailResData(res: any): {
  isSuccess: boolean;
  msg: string;
  data: any;
} {
  return {
    isSuccess: false,
    data: res.data ? res.data : {},
    msg: res.msg ? res.msg : ''
  }
}

//:{
//   isSuccess: boolean;
//   msg: string;
//   data: any;
// }这个是返回类型的判断
//data?: string; ?表示可有可无

export function getResultResData(res: {
  code: number;
  msg: string;
  data?: string;
}): {
  isSuccess: boolean;
  msg: string;
  data: any;
} {
  if (res.code == 0) {
    return getSuccessResData(res);
  }

  return getFailResData(res);
}
