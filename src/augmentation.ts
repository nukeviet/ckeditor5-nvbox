/**
 * NukeViet NVBox for CKEditor5
 * @version 5.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2025 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

import type {
	NVBox,
	NVBoxCommand,
	NVBoxConfig,
	NVBoxEditing,
} from './index.js';

declare module '@ckeditor/ckeditor5-core' {
	interface EditorConfig {
		/**
		 *
		 */
		nvbox?: NVBoxConfig;
	}

	interface PluginsMap {
		[NVBox.pluginName]: NVBox;
		[NVBoxEditing.pluginName]: NVBoxEditing;
	}

	interface CommandsMap {
		nvbox: NVBoxCommand;
	}
}
