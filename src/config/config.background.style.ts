import { BackgroundStyle } from '../type';

const DEFAULT_IS_ACTIVE = false;
const DEFAULT_FILL_STYLE = '#FFFFFF';
const DEFAULT_OPACITY = 0.2;
const DEFAULT_IS_IMAGE = false;
const DEFAULT_IMAGE = new Image();

class BackgroundStyleConfig {
  isActvie: boolean = DEFAULT_IS_ACTIVE;
  fillStyle: string = DEFAULT_FILL_STYLE;
  opacity: number = DEFAULT_OPACITY;
  isImage: boolean = DEFAULT_IS_IMAGE;
  image: HTMLImageElement = DEFAULT_IMAGE;

  constructor(style: BackgroundStyle | undefined) {
    if (style !== undefined) {
      this.isActvie = style.isActvie ?? DEFAULT_IS_ACTIVE
      this.fillStyle = style.fillStyle ?? DEFAULT_FILL_STYLE
      this.opacity = style.opacity ?? DEFAULT_OPACITY
      this.isImage = style.isImage ?? DEFAULT_IS_IMAGE
      this.image = style.image ?? DEFAULT_IMAGE
    }
  }
}

export default BackgroundStyleConfig;