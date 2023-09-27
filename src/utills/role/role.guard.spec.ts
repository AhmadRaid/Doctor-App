import { RoleGuard } from './doctor.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    expect(new RoleGuard()).toBeDefined();
  });
});
