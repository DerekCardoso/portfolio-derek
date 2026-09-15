import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '../../data/content';
import { PlaceholderImage } from '../ui/PlaceholderImage';

/**
 * Detalhe de um projeto: visualizador grande na área livre da esquerda,
 * descrição/tecnologias/link à direita e as miniaturas embaixo. Clicar numa
 * miniatura troca a imagem do visualizador.
 *
 * A capa (`cover`) é sempre a primeira imagem e a que abre por padrão.
 * Sem `gallery`, completa com placeholders para o layout não ficar vazio.
 */

// mínimo de quadros na tira de miniaturas enquanto não há fotos reais
const MIN_SLOTS = 3;

export function ProjectDetail({ project }: { project: Project }) {
  const photos = useMemo(() => {
    const list: (string | undefined)[] = [];
    if (project.cover) list.push(project.cover);
    if (project.gallery?.length) list.push(...project.gallery);
    while (list.length < MIN_SLOTS) list.push(undefined);
    return list;
  }, [project]);

  const [active, setActive] = useState(0);

  // ao trocar de projeto, volta para a capa
  useEffect(() => setActive(0), [project.id]);

  const activeSrc = photos[active];

  return (
    <motion.article
      className="project-detail"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* visualizador — fixo na área livre à esquerda (vira estático no mobile) */}
      <div className="detail-viewer">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${project.id}-${active}`}
            className="detail-viewer-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <PlaceholderImage
              src={activeSrc}
              alt={`${project.title} — imagem ${active + 1}`}
              label={project.title}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="detail-head">
        <span className="detail-meta">
          {project.category.pt} · {project.year}
        </span>
        <p className="detail-desc">{project.description.pt}</p>

        {project.stack.length > 0 && (
          <div className="tag-row">
            {project.stack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.link && (
          <a className="detail-link" href={project.link.href} target="_blank" rel="noreferrer">
            Código ↗
          </a>
        )}
      </div>

      <div className="detail-gallery">
        {photos.map((src, i) => (
          <button
            type="button"
            key={src ?? i}
            className={`detail-thumb ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Ver imagem ${i + 1} de ${project.title}`}
            aria-pressed={i === active}
          >
            <PlaceholderImage
              src={src}
              alt={`${project.title} — imagem ${i + 1}`}
              label={project.title}
              className="detail-photo"
            />
          </button>
        ))}
      </div>
    </motion.article>
  );
}
