/**
 * NukeViet NVBox for CKEditor5
 * @version 5.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2026 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

import type { Translations } from 'ckeditor5';

const translations: Translations = {
	'vi': {
		dictionary: {
			// Image
			'Image': 'Ảnh',
			// Inserting image failed
			'Inserting image failed': 'Chèn ảnh thất bại',
			// Could not insert image at the current position.
			'Could not insert image at the current position.': 'Không thể chèn ảnh tại vị trí hiện tại.',
			// By file manager.
			'By file manager': 'Từ trình quản lý tệp tin',
			// Toolbar button text for open FileManager.
			'Insert file from NVFileManager': 'Chèn tệp tin từ trình quản lý File',
			// browserUrl is not set.
			'browserUrl is not set.': 'Chưa thiết lập browserUrl',
			// Error config NVBox
			'Error config NVBox': 'Lỗi thiết lập plugin NVBOX',
			// Tooltip khi hover vào nút chèn media trên thanh Toolbar
			'Insert media with file manager': 'Chèn phương tiện bằng trình quản lý tệp tin',
			// Tooltip khi hover vào nút chèn media trên thanh Toolbar khi có media đã bôi đậm trong trình soạn thảo
			'Replace media with file manager': 'Thay thế phương tiện bằng trình quản lý tệp tin'
		}
	}
};

export default translations;
