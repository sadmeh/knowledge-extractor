import SpriteText from 'three-spritetext'
import {Group, TextureLoader, SpriteMaterial, Sprite} from 'three'

export function getNodeThreeObject() {
  return node => {
    const group = new Group();
    const spriteText = new SpriteText(node.id);
    spriteText.color = node.color;
    spriteText.textHeight = 8;

    const imgTexture = new TextureLoader().load(node.img);
    const material = new SpriteMaterial({map: imgTexture});
    const sprite = new Sprite(material);
    sprite.center.set(0.5, -0.5)
    sprite.scale.set(20, 20);

    group.add(spriteText)
    group.add(sprite)
    return group;
  };
}