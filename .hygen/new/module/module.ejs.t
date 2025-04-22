---
to: "src/modules/<%= h.folderName(name) %>/<%= h.moduleFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !picks.includes('Module') %>
---
<%
moduleClassName = h.moduleClassName(name);
controllerClassName = h.controllerClassName(name);
serviceClassName = h.serviceClassName(name);
repositoryClassName = h.repositoryClassName(name);
controllerFileName = h.controllerFileName(name);
serviceFileName = h.serviceFileName(name);
repositoryFileName = h.repositoryFileName(name);
%>
import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { <%= repositoryClassName %> } from '@models/repositories/<%= repositoryFileName %>';

import { <%= controllerClassName %> } from './<%= controllerFileName %>';
import { <%= serviceClassName %> } from './<%= serviceFileName %>';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([<%= repositoryClassName %>])],
    controllers: [<%= controllerClassName %>],
    providers: [<%= serviceClassName %>],
})
export class <%= moduleClassName %> {}
