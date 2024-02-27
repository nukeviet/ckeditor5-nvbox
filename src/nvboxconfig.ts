/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
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
     *
     */
    browseUrl?: string;

    /*
     *
     */
    options?: NVBoxOptions;
}

export interface NVBoxOptions extends Record<string, unknown> {
	noCache?: boolean;
}
