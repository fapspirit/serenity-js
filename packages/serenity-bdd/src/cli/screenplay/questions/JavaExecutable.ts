import type { AnswersQuestions, UsesAbilities } from '@serenity-js/core';
import { Question } from '@serenity-js/core';
import { Path } from '@serenity-js/core/lib/io';
import * as path from 'path';   // eslint-disable-line unicorn/import-style
import { promisify } from 'util';
const findJavaHome = promisify(require('find-java-home'));  // eslint-disable-line  @typescript-eslint/no-var-requires

/**
 * @package
 */
export class JavaExecutable extends Question<Promise<Path>> {
    private subject: string;

    constructor() {
        super();
        this.subject = `java executable`;
    }

    answeredBy(actor: AnswersQuestions & UsesAbilities): Promise<Path> {
        return findJavaHome({ allowJre: true })
            .then(pathToJavaHome => path.join(pathToJavaHome, 'bin', this.javaFileName()))
            .then(Path.fromJSON);
    }

    /**
     * @desc
     *  Changes the description of this question's subject.
     *
     * @param {string} subject
     * @returns {Question<T>}
     */
    describedAs(subject: string): this {
        this.subject = subject;
        return this;
    }

    toString(): string {
        return this.subject;
    }

    private javaFileName() {
        return this.isWindows()
            ? 'java.exe'
            : 'java';
    }

    private isWindows() {
        return process.platform.indexOf('win') === 0;
    }
}
