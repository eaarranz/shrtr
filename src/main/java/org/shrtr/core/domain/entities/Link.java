package org.shrtr.core.domain.entities;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "links")
public class Link extends BaseEntity {
  private String original;
  private String shortened;
  private int counter;

  @ManyToOne
  @JoinColumn(name = "owner_id")
  private User owner;

}
