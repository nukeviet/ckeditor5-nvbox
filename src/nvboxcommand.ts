/**
 * NukeViet NVBox for CKEditor5
 * @version 5.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2025 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

/* global document, window, setTimeout, URL */

import { Command, type Editor } from 'ckeditor5';

import type { Dialog, Notification } from 'ckeditor5';
import { extIsAudio, extIsImage, extIsVideo, getFileExtension } from './utils.js';

import type { NVToolsUI } from '@nukeviet/ckeditor5-nvtools';;
import type { NVDocsInsertUI } from '@nukeviet/ckeditor5-nvdocs';;

export default class NVBoxCommand extends Command {
	constructor(editor: Editor) {
		super(editor);

		// The NVBox command does not affect data by itself.
		this.affectsData = false;

		// Remove default document listener to lower its priority.
		this.stopListening(this.editor.model.document, 'change');

		// Lower this command listener priority to be sure that refresh() will be called after link & image refresh.
		this.listenTo(this.editor.model.document, 'change', () => this.refresh(), { priority: 'low' });
	}

	/**
	 * @inheritDoc
	 */
	public override refresh(): void {
		const imageCommand = this.editor.commands.get('insertImage')!;
		const linkCommand = this.editor.commands.get('link')!;

		// The NVBox command is enabled when one of image or link command is enabled.
		this.isEnabled = imageCommand.isEnabled || linkCommand.isEnabled;
	}

	/**
	 * @inheritDoc
	 */
	public override execute(href: string | Element = '', options: Record<string, boolean> = {}): void {
		const editor: Editor = this.editor;
		const nvboxOptions = this.editor.config.get('nvbox.options') || {};
		const notification: Notification = editor.plugins.get('Notification');
		const t = editor.locale.t;

		if (href !== '' && !(href instanceof Element)) {
			const dialog: Dialog = editor.plugins.get('Dialog');

			// Trả về path cho ô lưu ảnh ngoài
			if (dialog.id == 'nvtoolsSaveExternalImage') {
				const nvtoolsUI: NVToolsUI = editor.plugins.get('NVToolsUI');
				nvtoolsUI.setExternalImagePath(href);
				return;
			}

			// Trả về path cho ô chèn tài liệu
			if (dialog.id == 'nvdocsInsert') {
				const nvdocsInsertUI: NVDocsInsertUI = editor.plugins.get('NVDocsInsertUI');
				nvdocsInsertUI.setUrl(href);
				return;
			}

			// Xử lý chèn ảnh, link, media tùy theo định dạng file đã pick
			const fileExt = getFileExtension(href);

			// Chèn ảnh, command của ckeditor
			if (extIsImage(fileExt)) {
				const imageCommand = editor.commands.get('insertImage')!;

				if (!imageCommand.isEnabled) {
					notification.showWarning(t('Could not insert image at the current position.'), {
						title: t('Inserting image failed'),
						namespace: 'nvbox'
					});

					return;
				}

				if (options.alt) {
					editor.execute('insertImage', {
						source: [{
							src: href,
							alt: options.alt
						}]
					});
				} else {
					editor.execute('insertImage', { source: href });
				}
				return;
			}

			// Chèn âm thanh, video
			if (extIsAudio(fileExt) || extIsVideo(fileExt)) {
				editor.execute('insertNVMedia', { source: href });
				return;
			}

			// Chèn link, command của ckeditor
			editor.execute('link', href, {
				linkIsExternal: false,
				linkIsDownloadable: true
			});
			return;
		}

		// Lấy đường dẫn duyệt file
		let browseUrl = this.editor.config.get('nvbox.browseUrl') || '';
		if (browseUrl == '') {
			const notification: Notification = editor.plugins.get('Notification');
			const t = editor.locale.t;

			notification.showWarning(t('browserUrl is not set.'), {
				title: t('Error config NVBox'),
				namespace: 'nvbox'
			});

			return;
		}
		if (nvboxOptions.noCache) {
			browseUrl += ((browseUrl.indexOf('?') == -1) ? '?' : '&') + 'nocache=' + (new Date().getTime());
		}

		const pickerUrl = editor.config.get('nvbox.pickerUrl') || '';
		if (!!pickerUrl && !!href && href instanceof Element) {
			// NukeViet 5 trình chọn file mới
			this._showPicker(href);
			return;
		}

		// Mở popup duyệt file mặc định nếu không có phương thức nào mới
		let w = (screen.availWidth * 70 / 100);
		let h = (screen.availHeight * 70 / 100);

		var leftSc = (screen.width) ? (screen.width - w) / 2 : 0,
			topSc = (screen.height) ? (screen.height - h) / 2 : 0,
			settings = 'height=' + h + ',width=' + w + ',top=' + topSc + ',left=' + leftSc;
		window.open(browseUrl, 'filemanager', settings)?.focus();
	}

	private waitPicker: boolean = false;

	/**
	 * Hiển thị trình chọn file
	 */
	private _showPicker(element: Element): void {
		// Khi chưa load xong Picker thì chờ đến khi load xong mới hiển thị
		if (!window.nvPickerReady) {
			if (!this.waitPicker) {
				this.waitPicker = true;
				document.addEventListener('nv.picker.ready', () => {
                    this._delayShowPicker(element);
                });
			}
			return;
		}
		this._delayShowPicker(element);
	}

	/**
	 * Hiển thị trình chọn file sau khi đã load xong
	 */
	private _delayShowPicker(element: Element): void {
		let browseUrl = this.editor.config.get('nvbox.browseUrl') || '';
		const u = new URL(browseUrl, window.location.origin);

		const options: Record<string, any> = {};
		u.searchParams.has('editor_id') && (options.editorId = u.searchParams.get('editor_id'));
		if (u.searchParams.has('path')) {
			options.path = u.searchParams.get('path');
			options.currentpath = u.searchParams.get('path');
		}
		u.searchParams.has('currentpath') && (options.currentpath = u.searchParams.get('currentpath'));
		if (u.searchParams.has('type')) {
			options.type = u.searchParams.get('type');
		} else {
			options.type = 'file';
		}
		u.searchParams.has('alt') && (options.alt = u.searchParams.get('alt'));

		const picker = nukeviet.Picker.getOrCreateInstance(element, options);

		// Dùng để pick lần thứ 2 trở đi
		// picker.setOption('imgfile', options.imgfile);

		picker.show();
	}
}

declare const nukeviet: any;
