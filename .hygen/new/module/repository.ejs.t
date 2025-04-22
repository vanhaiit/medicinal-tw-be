---
to: "src/models/repositories/<%= h.repositoryFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !picks.includes('Repository') %>
---
<%
repositoryClassName = h.repositoryClassName(name);
entityClassName = h.entityClassName(name);
entityFileName = h.entityFileName(name);
%>
import { Repository } from 'typeorm';

import { <%= entityClassName %> } from '@models/entities/<%= entityFileName %>';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

@CustomRepository(<%= entityClassName %>)
export class <%= repositoryClassName %> extends Repository<<%= entityClassName %>> {}
