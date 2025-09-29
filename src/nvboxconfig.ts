/**
 * NukeViet NVBox for CKEditor5
 * @version 5.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2025 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

/**
 * @module nvbox/nvboxconfig
 */

/**
 * ```
 * ClassicEditor
 * 	.create( editorElement, {
 * 		nvbox: {
 * 			options: {
 * 			},
 *          browseUrl: '',
 * 		}
 * 	} )
 * 	.then( ... )
 * 	.catch( ... );
 * ```
 */
export interface NVBoxConfig {
    /*
     * Url duyệt file
     */
    browseUrl?: string;

    /*
     * Các tùy chọn của NVBox
     */
    options?: NVBoxOptions;

    /**
     * Phiên bản NukeViet sử dụng
     */
    version?: string;
}

export interface NVBoxOptions extends Record<string, unknown> {
	noCache?: boolean;
}
