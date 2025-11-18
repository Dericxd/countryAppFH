import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {
  placeholder = input <string>('Buscar');
  value = output <string>();
  debounceTime = input<number>(500);

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => clearTimeout(timeout));
  });
}
