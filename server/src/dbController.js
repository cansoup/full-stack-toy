import fs from 'fs'; // nodejs의 파일 시스템 메서드들이 모여있는 라이브러리
import { resolve } from 'path'; // 경로 설정 수정용

// 현재 경로가 basePath로 잡히게 됨.
const basePath = resolve();

// json DB
const filenames = {
  messages: resolve(basePath, 'src/db/messages.json'),
  users: resolve(basePath, 'src/db/users.json'),
}

// 파일을 read, write 하는 기능
export const readDB = target => {
  try {
    // 인코딩을 명시하지 않으면 내용이 깨져보일 수 있다.
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'))
  } catch (err) {
    console.error(err);
  }
}

// data를 가지고 target을 덮어씌울 필요가 있음.
export const writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data))
  } catch (err) {
    console.error(err);
  }
}