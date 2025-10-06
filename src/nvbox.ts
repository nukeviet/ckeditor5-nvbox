/**
 * NukeViet NVBox for CKEditor5
 * @version 5.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2025 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

import { Plugin } from 'ckeditor5';
import NVBoxUI from './nvboxui.js';
import NVBoxEditing from './nvboxediting.js';

import '../theme/nvbox.css';

declare global {
    interface Window {
        nvPickerLoad?: boolean;
        nvPickerReady?: boolean;
        nukeviet?: {
            Picker?: any;
            [key: string]: any;
        };
    }
}

export default class NVBox extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'NVBox' as const;
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return ['Link', NVBoxEditing, NVBoxUI] as const;
    }
}
