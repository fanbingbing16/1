export interface collectJson {
  stime?: string; //开始测试时间 //不是试卷生成时间,由前端发来
  etime?: string; //结束测试时间 //不是试卷提交时间,由前端发来
  dtime?: string; //总经过时间 //也由前端发来 不是上面两个的差
  children: {
    //孩子信息
    //完整儿童信息
    name: string;
    gender: string;
    birthday: string;
    height?: string;
    weight?: string;
    birthWeek?: string;
    birthDay?: string;
    birthHeight?: string;
    birthWeight?: string;
    birthHead?: string;
    head?: string;
  };
  answer: {
    //答题
    [stid: string]: {
      //试题ID
      xxid?: string; //单选选项ID
      xxids?: string[]; //多选选项ID
      //   [...?]:string[] //其他类型答题
    };
  };
}

export interface CollecReport {
  gs?: any;
  adv?: any;
  score?: any;
}
