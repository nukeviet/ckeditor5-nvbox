/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* global document, window, setTimeout, URL */

import { Command } from 'ckeditor5/src/core.js';

export default class NVBoxCommand extends Command {
	/**
	 * @inheritDoc
	 */
	public override refresh(): void {
		console.log('refresh nvbox command');
	}

	/**
	 * @inheritDoc
	 */
	public override execute(): void {
		console.log('execute nvbox command');
	}
}
