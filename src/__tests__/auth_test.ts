import { authenticateUser } from '../authentication';

import { OAuth2Client } from 'google-auth-library';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import open from 'open';

jest.mock('http');
jest.mock('fs');
jest.mock('open');
jest.mock('google-auth-library');

//test when token file exists, oauth2Client is returned


// tests for when token file does not exist

// do setup once at beginning of file
