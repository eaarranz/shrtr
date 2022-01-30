package org.shrtr.core.domain.repositories;

import org.shrtr.core.domain.entities.Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface LinksRepository extends JpaRepository<Link, UUID> {
  Optional<Link> getByOriginal(String originalUrl);
  Optional<Link> getByShortened(String shortened);
}
