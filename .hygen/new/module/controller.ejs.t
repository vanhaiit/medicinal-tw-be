---
to: "src/modules/<%= h.folderName(name) %>/<%= h.controllerFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !picks.includes('Controller') %>
---
<%
apiTagName = h.apiTagName(name);
controllerPrefixName = h.folderName(name);
controllerClassName = h.controllerClassName(name);
serviceClassName = h.serviceClassName(name);
serviceFileName = h.serviceFileName(name);
%>
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { <%= serviceClassName %> } from './<%= serviceFileName %>';

@ApiTags('<%= apiTagName %>')
@Controller('<%= controllerPrefixName %>')
export class <%= controllerClassName %> {
    constructor(private readonly <%= h.inflection.camelize(serviceClassName, true) %>: <%= serviceClassName %>) {}
}