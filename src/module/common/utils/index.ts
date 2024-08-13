import * as dayjs from "dayjs";
import * as Lodash from "lodash";
import { v4 as uuidv4 } from "uuid";

/**
 * 生成唯一id
 * UUID
 * @returns
 */
export function GenerateUUID(): string {
  const uuid = uuidv4();
  return uuid.replaceAll("-", "");
}

/**
 * 获取当前时间
 * YYYY-MM-DD HH:mm:ss
 * @returns
 */
export function GetNowDate() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
}
