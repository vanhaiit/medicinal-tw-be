---
to: "src/models/entities/<%= h.entityFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !picks.includes('Entity') %>
---
<%
tableName = h.tableName(name);
entityClassName = h.entityClassName(name);
%>
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/common/base-entity';

@Entity('<%= tableName %>')
export class <%= entityClassName %> extends BaseEntity {
}