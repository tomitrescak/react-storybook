declare var module: any; // dangerous

declare module "@kadira/storybook" {
  interface Story {
      add (storyName: string, callback: Function): Story;
  }

  export function storiesOf(name: string, module: any): Story;
  export function action(name: string, ...params: any[]): Function;
}