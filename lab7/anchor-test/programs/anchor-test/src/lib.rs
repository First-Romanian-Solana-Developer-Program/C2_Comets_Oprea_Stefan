use anchor_lang::prelude::*;

declare_id!("CnCdR6ttiBL7m8sKQxHfwzrk49kDZ5HRESoMuQ4FZgWi");

#[program]
pub mod anchor_test {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
