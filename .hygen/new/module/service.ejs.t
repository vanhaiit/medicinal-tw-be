---
to: "src/modules/<%= h.folderName(name) %>/<%= h.serviceFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !picks.includes('Service') %>
---
<%
serviceClassName = h.serviceClassName(name);
repositoryClassName = h.repositoryClassName(name);
repositoryFileName = h.repositoryFileName(name);
%>
import { Injectable } from '@nestjs/common';

import { <%= repositoryClassName %> } from '@models/repositories/<%= repositoryFileName %>';

@Injectable()
export class <%= serviceClassName %> {
    constructor(private readonly <%= h.inflection.camelize(repositoryClassName, true) %>: <%= repositoryClassName %>) {}
}
