import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HTTPHeaderAuthGuard extends AuthGuard('httpheader') {}
