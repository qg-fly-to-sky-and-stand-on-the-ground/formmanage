const getSuccessResult = (data: {
    code: number;
    msg: string;
    data?: any
}): {
    isSuccess: boolean;
    msg: string;
    data: any
} => {
    return {
        isSuccess: true,
        msg: data.msg,
        data: data.data ? data.data : {}
    }
};

const getFailResult = (data: {
    code: number;
    msg: string;
    data?: any
}): {
    isSuccess: boolean;
    msg: string;
    data: any
} => {
    return {
        isSuccess: false,
        msg: data.msg,
        data: data.data ? data.data : {}
    }
};

export const getFormatResult = (data: {
    code: number;
    msg: string;
    data?: any
}): {
    isSuccess: boolean;
    msg: string;
    data: any
} => {
    if (data.code == 0) {
        return getSuccessResult(data);
    }

    return getFailResult(data);
};