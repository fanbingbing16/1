import { isArray, isNotEmptyObject, isObject } from "class-validator";
import { Edge } from "graphql-relay";
import { EntityTarget, getRepository, ObjectLiteral } from "typeorm";
import { ConnectionBase } from "../paginate/connection";
import { PaginationArgs } from "../paginate/connection-paging";

export function getQueryVariable(query: any) {
  const vars = query.replace("/?", "").split("&");
  const params: any = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    params[pair[0]] = pair[1];
  }
  return params;
}

export function handleListParams(query: any) {
  const { limit, offset, ...params } = query;
  const connectionArgs: {
    where: any;
    orderBy: any;
    pagination: PaginationArgs;
  } = { where: {}, orderBy: {}, pagination: { limit: 10, offset: 0 } };
  connectionArgs.pagination.limit = limit;
  connectionArgs.pagination.offset = offset;
  for (const key in params || {}) {
    if (
      Object.prototype.hasOwnProperty.call(params, key) &&
      key.indexOf("_") != -1
    ) {
      connectionArgs.where[key] = params[key];
    } else {
      connectionArgs.orderBy[key] = params[key];
    }
  }
  return connectionArgs;
}

/**
 * 一对一查询
 * 一对多查询
 * @param data
 * @param selectArr
 * @returns
 */
export async function resolveField(
  data: Array<Edge<any>> | ObjectLiteral,
  selectArr: {
    selectId: string;
    setfield: string;
    selectEntityfield: string;
    selectEntity: EntityTarget<ObjectLiteral>;
  }[]
): Promise<any> {
  // Promise<Array<Edge<any>> | ObjectLiteral>
  let resutData: any = data;
  if (isArray(data) && data.length > 0) {
    const idsObj: any = {};
    for (const iterator of selectArr) {
      idsObj.setfield = iterator.setfield;
      idsObj.ids = data.map((_v: any) => _v.node[iterator.selectId]);
      const entityArr = await getRepository(iterator.selectEntity).findByIds(
        idsObj.ids
      );
      resutData = data.map((_v: any) => {
        for (const entity of entityArr) {
          if (
            _v.node[iterator.selectId] === entity[iterator.selectEntityfield]
          ) {
            _v.node[iterator.setfield] = _v.node[iterator.setfield]
              ? _v.node[iterator.setfield].push(entity)
              : [entity];
          }
        }
        return _v;
      });
    }
  }

  if (isObject(data) && isNotEmptyObject(data)) {
    resutData = data;
    for (const iterator of selectArr) {
      const entityArr = await getRepository(iterator.selectEntity).find({
        where: {
          [iterator.selectEntityfield]: resutData[iterator.selectId],
        },
      });
      resutData[iterator.setfield] = entityArr;
    }
  }
  return resutData;
}

/**
 * 多对一查询
 * 数组字段查询
 * @param data
 * @param selectArr
 * @returns
 */
export async function resolveArrField(
  data: Array<Edge<any>> | ObjectLiteral,
  selectArr: {
    selectId: string;
    setfield: string;
    selectEntityfield: string;
    selectEntity: EntityTarget<ObjectLiteral>;
  }[]
): Promise<any> {
  // Promise<Array<Edge<any>> | ObjectLiteral>
  let resutData: any = data;
  if (isArray(data) && data.length > 0) {
    const idsObj: any = {};
    for (const iterator of selectArr) {
      idsObj.setfield = iterator.setfield;
      let ids: any[] = [];
      idsObj.ids = data.forEach((_v: any) => {
        ids = [...ids, ...(_v.node[iterator.selectId] || [])];
      });
      const entityArr = await getRepository(iterator.selectEntity).findByIds(
        idsObj.ids
      );
      resutData = data.map((_v: any) => {
        for (const entity of entityArr) {
          if (
            _v.node[iterator.selectId].indexOf(
              entity[iterator.selectEntityfield]
            ) != -1
          ) {
            _v.node[iterator.setfield] = _v.node[iterator.setfield]
              ? _v.node[iterator.setfield].push(entity)
              : [entity];
          }
        }
        return _v;
      });
    }
  }
  return resutData;
}

export function sumArr(arr: any[]) {
  return arr.reduce(function (acr, cur) {
    return acr + cur;
  });
}

// /**
//  * Convert 64bit url string to Blob
//  * @name b64toBlob
//  * @method
//  * @param {string} b64Data - the 64bit url string which should be converted to Blob
//  * @param {string} contentType - content type of blob
//  * @param {int} sliceSize - optional size of slices if omited 512 is used as default
//  * @returns {Blob}
//  * TODO charCodeAt is not a function at Windows
//  */
//  function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
//   const byteCharacters = Buffer.from(b64Data, "base64"); // atob(b64Data);
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     const slice = byteCharacters.subarray(offset, offset + sliceSize);
//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i += 1) {
//       byteNumbers[i] = slice(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }
//   return new Blob(byteArrays, { type: contentType });
// }

export function dataURLToBlob(dataURL: any) {
  // function dataURLtoBlob (dataurl) {
  // var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
  // bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  // while (n--) {
  //   u8arr[n] = bstr.charCodeAt(n);
  // }
  // return new Blob([u8arr], { type: mime });
  // try {
  //   var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0]; // mime类型
  //   var byteString =
  //     // Buffer.from(mimeString, 'base64')
  //     atob(dataURL.split(",")[1]); //base64 解码
  //   var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
  //   var intArray = new Uint8Array(arrayBuffer); //创建视图

  //   for (var i = 0; i < byteString.length; i++) {
  //     intArray[i] = byteString.charCodeAt(i);
  //   }
  //   return new Blob([intArray], { type: mimeString });
  // } catch (error) {
  //   console.log(error);
  // }
  return Buffer.from(dataURL.split(",")[1], "base64");
  // }

  // const BASE64_MARKER = ";base64,";
  // let parts;
  // let contentType;
  // let raw;
  // if (dataURL.indexOf(BASE64_MARKER) === -1) {
  //   parts = dataURL.split(",");
  //   contentType = parts[0].split(":")[1];
  //   raw = decodeURIComponent(parts[1]);
  //   return new Blob([raw], { type: contentType });
  // }
  // parts = dataURL.split(BASE64_MARKER);
  // contentType = parts[0].split(":")[1];
  // raw = window.atob(parts[1]);
  // let rawLength = raw.length;
  // let uInt8Array = new Uint8Array(rawLength);
  // for (let i = 0; i < rawLength; ++i) {
  //   uInt8Array[i] = raw.charCodeAt(i);
  // }
  // return new Blob([uInt8Array], { type: contentType });
}
// export async function pdfToPngUtils(
//   dataBuffer: Buffer
// ): Promise<PngPageOutput[]> {
//   const pngPages: PngPageOutput[] = await pdfToPng(
//     dataBuffer, // The function accepts PDF file path or a Buffer
//     {
//       disableFontFace: true, // When `false`, fonts will be rendered using a built-in font renderer that constructs the glyphs with primitive path commands. Default value is true.
//       useSystemFonts: false, // When `true`, fonts that aren't embedded in the PDF document will fallback to a system font. Default value is false.
//       viewportScale: 2.0, // The desired scale of PNG viewport. Default value is 1.0.
//       outputFolder: "output/pdfImg", // Folder to write output PNG files. If not specified, PNG output will be available only as a Buffer content, without saving to a file.
//       outputFileMask: "base64", // Output filename mask. Default value is 'buffer'.
//       pdfFilePassword: "pa$$word", // Password for encrypted PDF.
//       pagesToProcess: [1, 3, 11], // Subset of pages to convert (first page = 1), other pages will be skipped if specified.
//       strictPagesToProcess: false, // When `true`, will throw an error if specified page number in pagesToProcess is invalid, otherwise will skip invalid page. Default value is false.
//       verbosityLevel: 0, // Verbosity level. ERRORS: 0, WARNINGS: 1, INFOS: 5. Default value is 0.
//     }
//   );
//   return pngPages;
// }
