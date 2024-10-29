// Функция для построения таблицы "плохого символа"
function buildLastTable(pattern) {
  const last = {}; // Таблица "плохого символа"
  const patternLength = pattern.length;

  // Заполняем таблицу значениями
  for (let i = 0; i < patternLength - 1; i++) {
    last[pattern[i]] = patternLength - 1 - i;
  }

  // Если последний символ еще не добавлен в таблицу, добавляем его
  if (!last.hasOwnProperty(pattern[patternLength - 1])) {
    last[pattern[patternLength - 1]] = patternLength;
  }

  return last;
}

// Функция для поиска всех вхождений шаблона в текст
function boyerMooreSearchAll(text, pattern) {
  const last = buildLastTable(pattern); // Таблица "плохого символа"
  const matches = []; // Массив для хранения позиций совпадений

  let i = pattern.length - 1; // Индекс символа в шаблоне

  while (i < text.length) {
    let k = 0; // Индекс символа в шаблоне

    // Поиск совпадения символов
    while (k < pattern.length && pattern[pattern.length - 1 - k] === text[i - k]) {
      k++;
    }

    if (k === pattern.length) {
      // Совпадение найдено
      matches.push(i - pattern.length + 2);

      // Сдвиг на максимум из сдвигов символа и сдвига по правилу "плохого символа"
      i += Math.max(1, k - last[text[i]]);
    } else {
      // Сдвиг на максимум из сдвигов символа и сдвига по правилу "плохого символа"
      i += Math.max(1, k - 1);
    }
  }

  return matches; // Возвращаем массив с позициями совпадений
}

// Пример использования
let text = prompt("Введите строку.")
let pattern = prompt("Введите подстроку.")

let results = boyerMooreSearchAll(text, pattern);

if (results.length > 0) {
  console.log("Совпадения найдены в позициях: " + results.join(", "));
} else {
  console.log("Совпадения не найдены.");
}
