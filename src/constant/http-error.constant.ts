export const httpErrors = {
    // user error
    USER_NOT_FOUND: {
        message: 'Người dùng không tồn tại .',
        code: 'USER_00031',
    },
    USERNAME_EXISTED: {
        message: 'Người dùng đã tồn tại.',
        code: 'USER_00034',
    },

    USERNAME_PHONE_EXISTED: {
        message: 'Sdt đã tồn tại.',
        code: 'USER_00034',
    },
    CODE_INVALID: {
        message: 'Mã xác thực không đúng.',
        code: 'USER_00035',
    },
    PASSWORD_IS_CORRECT: {
        message: 'Mật khẩu không chính xác.',
        code: 'USER_00040',
    },
    USER_INACTIVE: {
        message: 'Người dùng chưa được kích hoạt .',
        code: 'USER_00032',
    },
    PRODUCT_DOES_NOT_EXIST: {
        message: 'Sản phẩm không tồn tại.',
        code: 'PRODUCT_0001',
    },
    PRODUCT_SKU_EXIST: {
        message: 'Mã sku sản phẩm đã tồn tại.',
        code: 'PRODUCT_0002',
    },
    ITEM_DOES_NOT_EXIST: {
        message: 'Sản phẩm không tồn tại.',
        code: 'ITEM_0001',
    },

    ITEM_SKU_EXIST: {
        message: 'Mã sku đã tồn tại.',
        code: 'ITEM_0002',
    },

    MEDIA_DOES_NOT_EXIST: {
        message: 'File phương tiện không tồn tại.',
        code: 'MEDIA_0001',
    },
    PAGE_DOES_NOT_EXIST: {
        message: 'Trang không tồn tại.',
        code: 'PAGE_0001',
    },
    MESSAGE_DOES_NOT_EXIST: {
        message: 'Lời nhắn không tồn tại.',
        code: 'MESSAGE_0001',
    },
    ORDER_DOES_NOT_EXIST: {
        message: 'Đơn hàng không tồn tại.',
        code: 'ORDER_0001',
    },
    VOUCHER_DOES_NOT_EXIST: {
        message: 'Mã giảm giá không hợp lệ.',
        code: 'VOUCHER_0001',
    },
    VOUCHER_CODE_EXIST: {
        message: 'Mã giảm giá đã tồn tại.',
        code: 'VOUCHER_0002',
    },
    VOUCHER_CODE_EXPIRED: {
        message: 'Mã giảm giá hết hạn.',
        code: 'VOUCHER_0003',
    },
    CATEGORY_NOT_EXIST: {
        message: 'Loại sản phầm không tồn tại.',
        code: 'CATEGORY_0001',
    },
    ATTRIBUTE_NOT_EXIST: {
        message: 'Quy cách không tồn tại .',
        code: 'ATTRIBUTE_0001',
    },
    FOLDER_NOT_EXIST: {
        message: 'Không tìm thấy folder upload',
        code: 'UPLOAD_0001',
    },
    UPLOAD_ERROR: {
        message: 'Không thể lưu file',
        code: 'UPLOAD_0002',
    },
    FINDER_EXIST: {
        message: 'Thư mục đã tồn tại',
        code: 'FINDER_0001',
    },
    FINDER_NOT_EXIST: {
        message: 'Thư mục không tồn tại',
        code: 'FINDER_0002',
    },
    COMMENT_NOT_EXIST: {
        message: 'Bình luận không tồn tại.',
        code: 'COMMENT_0001',
    },
    POST_NOT_EXIST: {
        message: 'Bài viết không tồn tại.',
        code: 'POST_0001',
    },
};
