import chalk from 'chalk';

export class Logger {
  constructor(private verbose: boolean = false) {}

  info(message: string): void {
    console.log(chalk.blue('ℹ'), message);
  }

  success(message: string): void {
    console.log(chalk.green('✔'), message);
  }

  warn(message: string): void {
    console.log(chalk.yellow('⚠'), message);
  }

  error(message: string): void {
    console.error(chalk.red('✖'), message);
  }

  debug(message: string): void {
    if (this.verbose) {
      console.log(chalk.gray('○'), chalk.gray(message));
    }
  }

  progress(current: number, total: number, message?: string): void {
    const percentage = Math.round((current / total) * 100);
    const progressBar = this.createProgressBar(percentage);
    const text = message || 'Progress';
    
    process.stdout.write(
      `\r${chalk.cyan(progressBar)} ${percentage}% - ${text} [${current}/${total}]`
    );
    
    if (current === total) {
      console.log(); // New line when complete
    }
  }

  private createProgressBar(percentage: number): string {
    const width = 30;
    const filled = Math.round(width * (percentage / 100));
    const empty = width - filled;
    
    return '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']';
  }

  table(data: Record<string, any>): void {
    const maxKeyLength = Math.max(...Object.keys(data).map(k => k.length));
    
    console.log(chalk.gray('┌' + '─'.repeat(maxKeyLength + 2) + '┬' + '─'.repeat(30) + '┐'));
    
    for (const [key, value] of Object.entries(data)) {
      const paddedKey = key.padEnd(maxKeyLength);
      const formattedValue = String(value).padEnd(28);
      console.log(
        chalk.gray('│ ') + 
        chalk.cyan(paddedKey) + 
        chalk.gray(' │ ') + 
        formattedValue + 
        chalk.gray(' │')
      );
    }
    
    console.log(chalk.gray('└' + '─'.repeat(maxKeyLength + 2) + '┴' + '─'.repeat(30) + '┘'));
  }

  section(title: string): void {
    const line = '═'.repeat(50);
    console.log('\n' + chalk.bold.cyan(line));
    console.log(chalk.bold.cyan('  ' + title.toUpperCase()));
    console.log(chalk.bold.cyan(line) + '\n');
  }

  subsection(title: string): void {
    console.log('\n' + chalk.bold.white('▶ ' + title));
    console.log(chalk.gray('─'.repeat(40)));
  }

  list(items: string[], ordered: boolean = false): void {
    items.forEach((item, index) => {
      const prefix = ordered ? `${index + 1}.` : '•';
      console.log(chalk.gray(`  ${prefix}`) + ' ' + item);
    });
  }

  json(obj: any, indent: number = 2): void {
    console.log(chalk.gray(JSON.stringify(obj, null, indent)));
  }

  time(label: string): void {
    console.time(chalk.cyan(`⏱ ${label}`));
  }

  timeEnd(label: string): void {
    console.timeEnd(chalk.cyan(`⏱ ${label}`));
  }

  group(label: string): void {
    console.group(chalk.bold(label));
  }

  groupEnd(): void {
    console.groupEnd();
  }

  clear(): void {
    console.clear();
  }

  newLine(count: number = 1): void {
    console.log('\n'.repeat(count - 1));
  }
}