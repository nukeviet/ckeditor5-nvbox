/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

import type {
	NVBox,
	NVBoxCommand,
	NVBoxEditing,
} from './index.js';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[NVBox.pluginName]: NVBox;
		[NVBoxEditing.pluginName]: NVBoxEditing;
	}

	interface CommandsMap {
		nvbox: NVBoxCommand;
	}
}
