/**
 * Mostra a imagem quando existe; senão, um placeholder estilizado com o rótulo
 * (nome do projeto). Evita imagem quebrada / 404 enquanto os arquivos reais não
 * estão em `public/projects/`. Basta apontar `src` depois e ele passa a exibir.
 */
type PlaceholderImageProps = {
  src?: string;
  alt: string;
  /** texto do placeholder quando não há imagem (default: alt) */
  label?: string;
  className?: string;
};

export function PlaceholderImage({ src, alt, label, className }: PlaceholderImageProps) {
  const cls = ['ph-image', className].filter(Boolean).join(' ');

  if (src) {
    return <img className={cls} src={src} alt={alt} loading="lazy" />;
  }

  return (
    <div className={`${cls} ph-image-empty`} role="img" aria-label={alt}>
      <span>{label ?? alt}</span>
    </div>
  );
}
