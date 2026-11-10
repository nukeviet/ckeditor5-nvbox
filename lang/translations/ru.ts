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
	'ru': {
		dictionary: {
			// Image
			'Image': 'Изображение',
			// Inserting image failed
			'Inserting image failed': 'Не удалось вставить изображение.',
			// Could not insert image at the current position.
			'Could not insert image at the current position.': 'Не удалось вставить изображение в текущее положение.',
			// By file manager.
			'By file manager': 'Через файловый менеджер',
			// Toolbar button text for open FileManager.
			'Insert file from NVFileManager': 'Вставить файл из файлового менеджера',
			// browserUrl is not set.
			'browserUrl is not set.': 'URL-адрес браузера не установлен.',
			// Error config NVBox
			'Error config NVBox': 'Ошибка конфигурации NVBox',
			// Tooltip khi hover vào nút chèn media trên thanh Toolbar
			'Insert media with file manager': 'Вставить медиафайл через файловый менеджер',
			// Tooltip khi hover vào nút chèn media trên thanh Toolbar khi có media đã bôi đậm trong trình soạn thảo
			'Replace media with file manager': 'Заменить медиафайл через файловый менеджер'
		}
	}
};

export default translations;
