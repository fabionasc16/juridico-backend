export interface IPrismaSource<T> {
  create(args: T): Promise<T>;
  read(args: any): Promise<any>;
  update(args: T): Promise<void>;
  delete(args: any): Promise<void>;
}